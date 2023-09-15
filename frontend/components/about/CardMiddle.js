import styles from "@/styles/cardHolder.module.css";

// const m = Montserrat({ subsets: ["latin"] , weight: '400'});
function CardMiddle(props){
    return(
        <div className={`${styles.card_middle} `}>
        <h1 className={styles.title}>{props.title1} <span className={styles.h1_span}>{props.title2}</span> </h1>
        <p className={styles.des_middle}>{props.des}</p>
        
      {/* <Card title="Card Title 1" des="Description for Card 1" />
      <Card title="Card Title 2" des="Description for Card 2" /> */}
        </div>
    );
}
export default CardMiddle;