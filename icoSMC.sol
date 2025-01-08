// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address initialOwner) {
        _transferOwnership(initialOwner);
    }

    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    function owner() public view virtual returns (address) {
        return _owner;
    }

    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

abstract contract ReentrancyGuard {
    uint256 private constant _NOT_ENTERED = 1;
    uint256 private constant _ENTERED = 2;
    uint256 private _status;

    constructor() {
        _status = _NOT_ENTERED;
    }

    modifier nonReentrant() {
        require(_status != _ENTERED, "ReentrancyGuard: reentrant call");
        _status = _ENTERED;
        _;
        _status = _NOT_ENTERED;
    }
}

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);
    function description() external view returns (string memory);
    function version() external view returns (uint256);
    function getRoundData(uint80 _roundId) external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
    function latestRoundData() external view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    );
}

contract AFATokenICO is ReentrancyGuard, Ownable {
    IERC20 public afaToken;
    uint256 public tokenPriceUSDC; // Prix en USDC (avec 6 décimales)
    uint256 public startTime;
    uint256 public endTime;
    uint256 public minPurchaseUSDC = 1000 * 1e18;     // 500 AFA tokens minimum
    uint256 public maxPurchaseUSDC = 99999 * 1e18;   // 999 AFA tokens maximum
    uint256 public totalTokensSold;
    uint256 public constant MAX_TOKENS = 35000000 * 1e18; // 35 millions de tokens avec 18 décimales
    bool public icoActive;

    mapping(address => uint256) public tokensPurchased;
    AggregatorV3Interface public ethUsdPriceFeed;

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 usdcValue);
    event ICOStarted(uint256 startTime, uint256 endTime);
    event ICOEnded();
    event Debug(string message);

    // Adresse du TestUSDC sur Base Sepolia
    IERC20 public constant USDC = IERC20(0x340Bb88C0ebeeC199c3Ce6e292D3C32ddd05885f);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        require(_tokenAddress != address(0), "Token address cannot be zero");
        
        afaToken = IERC20(_tokenAddress);
        tokenPriceUSDC = 50000; // Prix fixé à 0.05 USDC
        ethUsdPriceFeed = AggregatorV3Interface(0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1);
    }

    function calculateTokenAmount(uint256 usdcAmount) public view returns (uint256) {
        return (usdcAmount * 1e18) / tokenPriceUSDC;
    }

    function buyTokens() external payable nonReentrant {
        require(icoActive, "ICO is not active");
        require(block.timestamp >= startTime && block.timestamp <= endTime, "ICO is not in progress");
        
        // Obtenir le prix ETH/USD depuis Chainlink (8 décimales)
        (, int256 price,,,) = ethUsdPriceFeed.latestRoundData();
        require(price > 0, "Invalid ETH price");
        
        // Convertir msg.value (18 décimales) en USDC (6 décimales)
        uint256 usdcValue = (msg.value * uint256(price)) / 1e20;
        uint256 tokenAmount = calculateTokenAmount(usdcValue);
        
        require(tokenAmount >= minPurchaseUSDC, "Below minimum token purchase");
        require(tokenAmount <= maxPurchaseUSDC, "Above maximum token purchase");
        require(tokenAmount > 0, "Token amount must be greater than 0");
        require(totalTokensSold + tokenAmount <= MAX_TOKENS, "Exceeds maximum token sale");
        
        tokensPurchased[msg.sender] += tokenAmount;
        totalTokensSold += tokenAmount;

        if (totalTokensSold >= MAX_TOKENS) {
            icoActive = false;
            emit ICOEnded();
        }
        
        require(afaToken.transfer(msg.sender, tokenAmount), "Token transfer failed");
        
        emit TokensPurchased(msg.sender, tokenAmount, usdcValue);
    }

    function buyWithUSDC(uint256 tokenAmount) external nonReentrant {
        require(icoActive, "ICO is not active");
        require(block.timestamp <= endTime, "ICO has ended");
        
        require(tokenAmount >= minPurchaseUSDC, "Below minimum token purchase");
        require(tokenAmount <= maxPurchaseUSDC, "Above maximum token purchase");
        
        uint256 usdcAmount = (tokenAmount * tokenPriceUSDC) / 1e18;
        require(USDC.transferFrom(msg.sender, address(this), usdcAmount), "USDC transfer failed");
        require(afaToken.transfer(msg.sender, tokenAmount), "Token transfer failed");
        
        tokensPurchased[msg.sender] += tokenAmount;
        totalTokensSold += tokenAmount;
        
        if (totalTokensSold >= MAX_TOKENS) {
            icoActive = false;
            emit ICOEnded();
        }
        
        emit TokensPurchased(msg.sender, tokenAmount, usdcAmount);
    }

    function setTokenPriceUSDC(uint256 _newPriceUSDC) external onlyOwner {
        require(_newPriceUSDC > 0, "Price must be greater than 0");
        tokenPriceUSDC = _newPriceUSDC;
    }

    function startICO() external onlyOwner {
        emit Debug("startICO called");
        require(!icoActive, "ICO is already active");
        icoActive = true;
        startTime = block.timestamp;
        endTime = startTime + 90 days;
        emit ICOStarted(startTime, endTime);
    }

    function endICO() external onlyOwner {
        require(icoActive, "ICO is not active");
        icoActive = false;
        emit ICOEnded();
    }

    function withdrawFunds() external onlyOwner {
        require(!icoActive || block.timestamp > endTime, "ICO is still active");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    function updateICOTimes(uint256 _startTime, uint256 _duration) external onlyOwner {
        require(!icoActive, "Cannot update times while ICO is active");
        require(_duration > 0, "Duration must be greater than 0");
        startTime = _startTime;
        endTime = _startTime + _duration;
    }

    function emergencyTokenWithdraw(IERC20 token) external onlyOwner {
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");
        require(token.transfer(owner(), balance), "Token withdrawal failed");
    }

    receive() external payable {
        revert("Use buyWithUSDC() to participate in the ICO");
    }

    fallback() external payable {
        revert("Use buyWithUSDC() to participate in the ICO");
    }
}