import React, {Component} from 'react';
import $ from '../../node_modules/jquery/dist/jquery.js';
import '../css/App.css';
import '../css/index.css';
//components
import QuestionCard  from './QuestionCard';
import Done from './Done';

class App extends Component {
  
  constructor() {
    super();
    this.state ={
      currIndex: 0,
      isDone:0, 
      isSelected:false,
      myQuestions:[],
      myAnswers :[]
    }
  }
  
  componentDidMount(){
    fetch('./Questions.json')
      .then(resp =>resp.json())
      .then((myQuestions) => this.setState({ myQuestions : myQuestions}));
  }

  submit(){
    //use post call with this current state of myAnswers object 
    this.setState({isDone:1});
    console.log('Final object------', this.state.myAnswers);
  }

  nextQ(){
    //adding answers to an obj; preparing to use post call when click Submit
    //local state variable
    
    this.setState({currIndex: this.state.currIndex+1});

    //when questions are all done - call submit()
    if(this.state.currIndex===this.state.myQuestions.length-1){
      this.submit();
    }

    //resetting isSelected
    this.setState({isSelected:false});

    //animation
    $(".card").fadeOut(400).fadeIn(400);
  }
  
  backQ (){
    this.setState({currIndex: this.state.currIndex-1});
    $(".card").fadeOut(300).fadeIn(300);
  }
  setAnswer = (answerData, isSelected) =>{
    if(isSelected){this.setState({isSelected:true})};

    let index_qid = this.state.currIndex;
    this.setState(state => {
      state.myAnswers[index_qid] = answerData;
    });
  }
 
  render(){
    const temp_currQuestion = this.state.myQuestions[this.state.currIndex]|| {};
    return (
      <div> 
        <Done visible={this.state.isDone} />

        <QuestionCard currQuestion={temp_currQuestion} isDone={this.state.isDone} getAnswerCallBack={this.setAnswer} />
        
        <div class={`navs ${this.state.isDone===1?"hide":""}`}>
          <button class={`btn-nav ${this.state.currIndex===0?"hide":""}`}  onClick={()=> this.backQ()}>Back</button>

          <button class={`btn-nav ${this.state.isSelected?"":"disable"}`} onClick={()=> this.nextQ()}  disabled={!this.state.isSelected} > 
            {this.state.currIndex < this.state.myQuestions.length-1?'Next':'Submit'}
          </button>
        </div>
      </div>
    );
  }
}

export default App;