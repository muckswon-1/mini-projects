import Header from "./Header";
import styles from './styles/Summary.module.css';
import Button from "./Button";

export default function Summary({formData}){

    const planType = formData.yearly ? "yr" : "mo";
    const addOns = formData.addOns;
    const price = formData.yearly ? 10 : 1;

    const total = formData.yearly ? (10 * addOns.length) + formData.planPrice : (1 * addOns.length) + formData.planPrice;
    
    return (
        <div  className={styles.container}>
            
            <table>
                <thead>
                    <tr>
                        <th>{formData.planName}({planType === "mo" ? "monthly" : "yearly"})</th>
                        <th>{`$${formData.planPrice} / ${planType}`}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        addOns.map(addOn => {
                            return (
                                <tr>
                                  <td>{addOn}</td>
                                  <td>{`+${price} / ${planType}`}</td>
                                </tr>
                            )
                        })
                    }
                    
                </tbody>
                <tfoot>
                    <td>Total({planType === "mo" ? "month" : "year"})</td>
                    <th>{`+$${total}`}</th>
                </tfoot>
            </table>
        </div>
    )
}