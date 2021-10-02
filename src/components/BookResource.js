import { useState, useEffect } from "react"
import '../css/Validation.css'

const BookResource = ({onBook, isShown}) => {
    const validControl = "validControl"
    const invalidControl = "invalidControl"
    const enabledButton = "enabledButton"
    const disabledButton = "disabledButton"
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [dateFromControlClass, setDateFromControlClass] = useState(invalidControl)
    const [dateToControlClass, setDateToControlClass] = useState(invalidControl)
    const [bookClass, setBookClass] = useState(disabledButton)

    const onSumbit = (e) => {
        e.preventDefault()
        
        if(validationPassed() === false)
        {
            return;
        }
        // API validate requested quantity for requested period
        
        onBook(dateFrom, dateTo, quantity)
    }

    const validationPassed = () =>
    {
        if(dateFrom === '')
        {
            alert("Please provide a date for Date From.")
            return false;
        }

        if(dateTo === '')
        {
            alert("Please provide a date for Date To.")
            return false;
        }
            
        if(dateTo < dateFrom){
            alert("Date From is smaller than Date To.")
            return false;
        }

        return true;
    }

    useEffect(() => {
        if(isShown === false)
        {
            setDateFrom('')
            setDateTo('')
            setQuantity(1)
        }
      }, [isShown])

    useEffect(() => {
        if(dateFrom === '')
        {
            setDateFromControlClass(invalidControl)
        }
        else
        {
            setDateFromControlClass(validControl)
        }

        if(dateTo === '')
        {
            setDateToControlClass(invalidControl)
        }
        else
        {
            setDateToControlClass(validControl)
        }

        if(dateFrom > dateTo)
        {
            setDateToControlClass(invalidControl)
        }

        if(dateFrom !== '' && dateTo !== '' && dateFrom < dateTo)
        {
            setDateFromControlClass(validControl)
            setDateToControlClass(validControl)
        }
    }, [dateFrom, dateTo])

    useEffect(() => {
        if(dateFromControlClass === validControl && dateToControlClass === validControl)
        {
            setBookClass(enabledButton)
        }
        else
        {
            setBookClass(disabledButton)
        }
    }, [dateFromControlClass, dateToControlClass])

    return (
        <form>
            <div>
                <label htmlFor='dateFromCtrl'>Date From</label>
                <input id='dateFromCtrl' type='datetime-local' value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                        className={dateFromControlClass}>
                </input>
            </div>
            <div>
                <label htmlFor='dateToCtrl'>Date To</label>
                <input id='dateToCtrl' type='datetime-local' value={dateTo} 
                        onChange={(e) => setDateTo(e.target.value)}
                        className={dateToControlClass}>
                </input>
            </div>
            <div>
                <label htmlFor='quantityCtrl'>Quantity</label>
                <input id='quantityCtrl' type='number' value={quantity} min='1'
                        onChange={(e) => setQuantity(e.target.value)}></input>
            </div>

            <input type='submit' value='Book' className={bookClass} onClick={onSumbit} />
        </form>
    )
}

export default BookResource