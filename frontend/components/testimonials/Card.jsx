import card from '@/styles/test_card.module.css'
import Image from 'next/image';
// import {AiFillStar} from 'react-icons/ai'
import { IconBase } from 'react-icons/lib';
function Card(props){
    return(
        <div className={card.card_div}>
            <div className={card.img_contain}>
                <Image src={props.image} height={80} width={80} className={card.card_img}></Image>
            </div>
            <h3 className={card.card_head}>{props.name}</h3>
            <p className={card.p_rating}>{props.rating}</p>
            <p className={card.p_des}>{props.des}</p>
        </div>
    );
}
export default Card;