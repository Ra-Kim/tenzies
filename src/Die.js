export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >   
            {props.value === 1 && <div className = "dot"></div>}
            {props.value === 2 && 
            <div className = "flex">
                <div className = "dot" style={{alignSelf: "flex-start"}}></div>
                <div className = "dot" style={{alignSelf: "flex-end"}}></div>
            </div>}
            {props.value === 3 &&
            <div className = "flex">
                <div className = "dot" style={{alignSelf: "flex-start"}}></div>
                <div className = "dot"></div>
                <div className = "dot" style={{alignSelf: "flex-end"}}></div>
            </div>
            }
            {props.value === 4 &&
            <div className = "flex">
                <div className="four-die-flex">
                <div className = "dot" style={{alignSelf: "flex-start"}}></div>
                <div className = "dot" style={{alignSelf: "flex-start", justifySelf:"flex-start"}}></div>
                </div>
                <div className="four-die-flex">
                <div className = "dot" style={{alignSelf: "flex-end", justifySelf:"left"}}></div>
                <div className = "dot" style={{alignSelf: "flex-end"}}></div>
                </div>
            </div>
            }
            {props.value === 5 &&
            <div className = "flex">
                <div className="four-die-flex">
                <div className = "dot" style={{alignSelf: "flex-start"}}></div>
                <div className = "dot" style={{alignSelf: "flex-start", justifySelf:"flex-start"}}></div>
                </div>
                <div className = "dot"></div>
                <div className="four-die-flex">
                <div className = "dot" style={{alignSelf: "flex-end", justifySelf:"left"}}></div>
                <div className = "dot" style={{alignSelf: "flex-end"}}></div>
                </div>
            </div>
            }
            {props.value === 6 &&
            <div className = "flex" style={{flexDirection: "column"}}>
                <div className="six-die-flex">
                <div className = "dot" ></div>
                <div className = "dot" ></div>
                </div>
                <div className="six-die-flex">
                <div className = "dot"></div>
                <div className = "dot"></div>
                </div>
                <div className="six-die-flex">
                <div className = "dot" ></div>
                <div className = "dot" ></div>
                </div>
            </div>
            }
        </div>
    )
}