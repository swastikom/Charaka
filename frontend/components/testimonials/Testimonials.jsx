// import Card from "@/components/testimonials/Card";
// import test from "@/styles/test_card.module.css";
// import { BsArrowRightCircleFill } from "react-icons/bs"
// import {BsFillArrowLeftCircleFill} from "react-icons/bs"
// function Testimonials() {
//     const card_info = [
//         {
//             c_image: "/AI_doctor.jpg",
//             c_name: "person1",
//             c_des: "UI is simple and very user friendly from my views. ", 
//             c_rating: "⭐⭐⭐⭐⭐⭐"
//         },
//         {
//             c_image: "/AI_doctor.jpg",
//             c_name: "person2",
//             c_des: "Thank you for taking such initiative. Keep going."
//         },
//         {
//             c_image: "/AI_doctor.jpg",
//             c_name: "person3",
//             c_des: "Overall it's a good project....hoping to see this project on a large scale "
//         },
//         {
//             c_name: "",
//             c_des:""
//         },
//         // {
//         //     c_name: "",
//         //     c_des:""
//         // },
//         // {
//         //     c_name: "",
//         //     c_des:""
//         // },
//         // {
//         //     c_name: "",
//         //     c_des:""
//         // },
//         // {
//         //     c_name: "",
//         //     c_des:""
//         // },

//     ]
//     let box = document.querySelector('.test_div');
//     const scroll_prev = ()=>{
//         // let width = box.clientWidth;
//         // box.scrollLeft = box.scrollLeft-width;
//         cardContainerRef.scrollBy({ left: -300, behavior: 'smooth' });
//     }
//     const scroll_next = ()=>{
//         // let width = box.clientWidth;
//         // box.scrollLeft = box.scrollLeft+width;
//         cardContainerRef.scrollBy({ left: 300, behavior: 'smooth' });
//     }
//     return (
//         // <div className={test.main_div}>
//         //     <h2 className={test.test_head}>Testimonials</h2>
//         //     <div className={test.card_contain}>
//         //         {/*   */}
//         //         <button onClick={scroll_prev}>prev</button>
//         //         <div className={test.test_div}>
//         //             {
//         //                 card_info.map(
//         //                     (i) => (
//         //                         <Card image={i.c_image} name={i.c_name} des={i.c_des} rating = {i.c_rating}></Card>
//         //                     )
//         //                 )
//         //             }
//         //         </div>
//         //         {/* <BsArrowRightCircleFill className={test.icon} onClick={scroll_next}/> */}
//         //         <button onClick={scroll_next}>prev</button>
//         //     </div>

//         // </div>
        
  
    
// }
// export default Testimonials;

import Card from "@/components/testimonials/Card";
import test from "@/styles/test_card.module.css";
import { BsArrowRightCircleFill } from "react-icons/bs";
import {FaEnvelopeOpenText} from "react-icons/fa";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function Testimonials() {
  const card_info = [
    {
      c_image: "/AI_doctor.jpg",
      c_name: "Sayak Gayen",
      c_des: "UI is simple and very user friendly from my views.",
      c_rating: "⭐⭐⭐⭐⭐"
    },
    {
      c_image: "/AI_doctor.jpg",
      c_name: "Purnata Dhar",
      c_des: "Thank you for taking such initiative. Keep going.",
      c_rating: "⭐⭐⭐⭐"
    },
    {
      c_image: "/AI_doctor.jpg",
      c_name: "Mohua Roy",
      c_des: "Overall it's a good project....hoping to see this project on a large scale",
      c_rating: "⭐⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Samrat Gupta",
        c_des: "It looks good and very user friendly ",
        c_rating: "⭐⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Shakya Bhowmik",
        c_des: "Good Initiative. Keep it up. ",
        c_rating: "⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Malati Roy",
        c_des: "Nice application, keep working ",
        c_rating: "⭐⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Dr. Arpan Sarkar ",
        c_des: "More and more expand among the people  ",
        c_rating: "⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Praloy Roy ",
        c_des: "This website is very useful. Truly amazing ",
        c_rating: "⭐⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Animesh Dutta ",
        c_des: "This is truly a revolutionary idea. It will reduce the healthcare cost significantly with improved accuracy.",
        c_rating: "⭐⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Moni Saha",
        c_des: "Great applause for such remarkable idea,carry on.",
        c_rating: "⭐⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Shombhu Poddar",
        c_des: "Moved by your unique perspective",
        c_rating: "⭐⭐⭐⭐⭐"
    },
    {
        c_image: "/AI_doctor.jpg",
        c_name: "Mohini Samaddar",
        c_des: "Your idea will surely come up to be a beneficial one.",
        c_rating: "⭐⭐⭐⭐⭐"
    },

  ];

  let cardContainerRef = null;

  const scroll_prev = () => {
    cardContainerRef.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scroll_next = () => {
    cardContainerRef.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className={test.main_div}>
      <h1 className={test.test_head}> <FaEnvelopeOpenText/>   {" "}Testimonials</h1>
      <div className={test.card_contain}>
      <BsFillArrowLeftCircleFill className={test.icon} onClick={scroll_prev}/>
        <div className={test.test_div} ref={(ref) => (cardContainerRef = ref)}>
          {card_info.map((i, index) => (
            <Card key={index} image={i.c_image} name={i.c_name} des={i.c_des} rating={i.c_rating}></Card>
          ))}
        </div>
        <BsArrowRightCircleFill className={test.icon} onClick={scroll_next}/>
      </div>
    </div>
  );
}

export default Testimonials;
