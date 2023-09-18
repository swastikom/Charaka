import {AiFillDatabase} from 'react-icons/ai'
import {BsGithub} from 'react-icons/bs'
import right_nav from '@/styles/footer.module.css'
import Link from 'next/link';
function FooterRightNav(){
    return(
        <div>
            <ul className={right_nav.ul}>
                <Link href={"https://www.kaggle.com/datasets/uom190346a/disease-symptoms-and-patient-profile-dataset?utm_medium=social&utm_campaign=kaggle-dataset-share&utm_source=facebook&fbclid=IwAR2Ozh0rEp_IAFMwnnW3MWZvQHGbfCxoeOF0PCmEQBjfspEOLjzsyAc5eR4"} target="_blank"><li className={right_nav.li} ><AiFillDatabase/>Dataset</li></Link>
                <Link href={"https://github.com/swastikom/Charaka"} target="_blank"><li className={right_nav.li_contact}><BsGithub/>GitHub</li></Link>
            </ul>
           
        </div>
    );

}
export default FooterRightNav;