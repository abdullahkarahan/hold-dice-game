
import React from "react"

export default function Dice (props) {
	let dots = Number.isInteger(props.value)
		? Array(props.value)
				.fill(0)
				.map((_, i) => <Dots key={i} />)
		: null;
        
        function Dots() {
            return (
                <span className="dot" /> 
            )}
        const styles = {
                backgroundColor: props.isHeld ? "#59E391" : "white"
            }
        function Face (props) {
            return (
                <div 
                    className="face"
                    style={styles}
                    >
                    {props.children}
                </div>
            )} 

    return (
        <div
            onClick={props.holdDice}
            >
            <Face>{dots}</Face>
        </div>
    
    )
};

