import thankyouIcon from '../assets/images/icon-thank-you.svg';
import style from './styles/Thankyou.module.css';
export  default function Thankyou(){

    return (
        <div className={style.container}>
            <img src={thankyouIcon} alt='thank you icon'/>
            <p>Thanks for confirming the subscription. We hope
                you have fun using our platform. If you ever need support, please feel
                free to email us at support@loremipsumgaming.com.
            </p>
        </div>
    )

}