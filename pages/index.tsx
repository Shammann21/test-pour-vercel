import Menu from "./homepageComponents/menu.js";
import HomeSection from "./homepageComponents/home.js";
import Section3 from "./homepageComponents/section3.js";
import Section4 from "./homepageComponents/section4.js";
import Section5 from "./homepageComponents/section5.js";
import Section6 from "./homepageComponents/section6.js";
import Section7 from "./homepageComponents/section7.js";
import Section8 from "./homepageComponents/section8.js";
import Footer from "./homepageComponents/footer.js";

/*

        
        

*/

export default function Home()
{
  return (
    <>
      <Menu />
      
        <HomeSection />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />        
        <Section7 />
        <Section8 />
        <Footer />
      
    </>
  )
}
