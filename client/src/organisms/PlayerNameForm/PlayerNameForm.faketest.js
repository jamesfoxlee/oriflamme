//Unit test not working due to modal acting weird, test it with Cypress.

// import { render, screen} from '@testing-library/react'
// import PlayerNameForm from './PlayerNameForm'
// import * as React from 'react'
// import userEvent from '@testing-library/user-event';
// import * as Modal from 'react-modal';
// jest.spyOn(Modal, "setAppElement").mockImplementation(param => console.log(`setAppElement:'${param}'`));



// describe('PlayerNameForm component', ()=>{
//     const testFoo= jest.fn()
  
//     test('should match the snapshot',()=>{
//        const {container}=  render(<PlayerNameForm  onSubmit={testFoo} show={testFoo} toogleModal={testFoo} />)
//         expect(container.firstChild).toMatchSnapshot();
//       })
//       test('should hide the modal when clicking the button', async ()=>{
//        const {getByText}= render(<div><PlayerNameForm onSubmit={testFoo} show={testFoo} toogleModal={testFoo}/> <div>{"Hello"}</div></div>)
//         const testButton=  screen.getByRole("button",{name:/submit/i});
//         await userEvent.click(testButton);
//         expect(getByText("Hello")).toBeTruthy();

//     })

// })