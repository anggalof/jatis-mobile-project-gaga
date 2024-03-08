import dataMessages from "../data/messages.json";

export const analyzeNextSteps = (step, userResponse, purposeMenu, purposeDeliver) => {
  const menuOne = userResponse.includes('1');
  const menuTwo = userResponse.includes('2');
  const menuThree = userResponse.includes('3');
  const wrongWord = 
    (purposeMenu === 0 || purposeDeliver === 0) && !userResponse.includes('123 tampilkan menu');
  
  let questionBot = dataMessages.data.question;
  let menuOneBot = dataMessages.data.menuOne;
  let menuTwoBot = dataMessages.data.menuTwo;
  let menuThreeBot = dataMessages.data.menuThree;
  let wrongWordBot = dataMessages.data.wrongWord;
  let endingBot = dataMessages.data.ending;
  
  return userResponse === "tampilkan menu"
    ? {
        purpose: questionBot.purpose,
        message: questionBot.message,
        options: questionBot.options,
        confirmation: questionBot.confirmation
      }
    : menuOne
    ? {
        purpose: menuOneBot.purpose,
        message: menuOneBot.message,
        confirmation: menuOneBot.confirmation
      }
    : menuTwo
    ? {
        purpose: menuTwoBot.purpose,
        message: menuTwoBot.message,
        confirmation: menuTwoBot.confirmation
      }
    : menuThree
    ? {
        purpose: menuThreeBot.purpose,
        message: menuThreeBot.message,
        confirmation: menuThreeBot.confirmation
      }
    : wrongWord
    ? {
        purpose: wrongWordBot.purpose,
        message: wrongWordBot.message,
        confirmation: wrongWordBot.confirmation
      }
    : {
        purpose: endingBot.purpose,
        message: endingBot.message,
        confirmation: endingBot.confirmation
      };
};
