showCardFunction = (ideaCard, index) => {
    
  this.setState({
    ideaCards: [
      ...this.state.ideaCards.slice(0, index),
      {
        ...this.state.ideaCards[index],
        showCard: !this.state.ideaCards[index].showCard
      },
      ...this.state.ideaCards.slice(index + 1)
    ]
  });

console.log(ideaCard);
};



this.setState({
  ideaCards: [
    ...this.state.ideaCards.slice(0,index),
    {
      ...this.state.ideaCards[index],
      comments: [...this.state.ideaCards[index].comments, newComment]
    },
    ...this.state.ideaCards.slice(index +1)