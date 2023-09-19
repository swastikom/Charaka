import Card from "@/components/testimonials/Card";
import test from "@/styles/test_card.module.css";
import { BsArrowRightCircleFill } from "react-icons/bs"
import {BsFillArrowLeftCircleFill} from "react-icons/bs"
function Testimonials() {
    const card_info = [
        {
            c_image: "/AI_doctor.jpg",
            c_name: "person1",
            c_des: "UI is simple and very user friendly from my views. "
        },
        {
            c_image: "/AI_doctor.jpg",
            c_name: "person2",
            c_des: "Thank you for taking such initiative. Keep going."
        },
        {
            c_image: "/AI_doctor.jpg",
            c_name: "person3",
            c_des: "Overall it's a good project....hoping to see this project on a large scale "
        },
        // {
        //     c_name: "",
        //     c_des:""
        // },
        // {
        //     c_name: "",
        //     c_des:""
        // },
        // {
        //     c_name: "",
        //     c_des:""
        // },
        // {
        //     c_name: "",
        //     c_des:""
        // },
        // {
        //     c_name: "",
        //     c_des:""
        // },

    ]
    return (
        <div className={test.main_div}>
            <h2 className={test.test_head}>Testimonials</h2>
            <div className={test.card_contain}>
                <BsFillArrowLeftCircleFill className={test.icon}/> 
                <div className={test.test_div}>
                    {
                        card_info.map(
                            (i) => (
                                <Card image={i.c_image} name={i.c_name} des={i.c_des}></Card>
                            )
                        )
                    }
                </div>
                <BsArrowRightCircleFill className={test.icon}/>
            </div>

        </div>

    );
}
export default Testimonials;