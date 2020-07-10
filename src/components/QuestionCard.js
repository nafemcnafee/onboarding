import React, {Component} from 'react';

class QuestionCard extends Component {
    getAnswer(event){
        let temp_ans = {"qid":this.props.currQuestion.qid, "ansid":event.target.value};
        this.props.getAnswerCallBack(temp_ans, true);
    }
    render(){
        const isDone = this.props.isDone || 0;
        const currQuestion = this.props.currQuestion;
        const currAnsChoices = this.props.currQuestion.choices || [];

        return (
            <div class={`${isDone===1?`noshow`:`card`}`}>
                <h5>{currQuestion.question}</h5>
            
                <div class="options" onChange={event => this.getAnswer(event)} >   
                    {currAnsChoices.map( (c) => 
                        <label key={c.cid}>
                        <input type="radio" name="toggle" value={c.cid} /><span>{c.value}</span></label> 
                    )}
                </div>
            </div>
        );
  }
}
export default QuestionCard;