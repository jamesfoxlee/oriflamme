import {render, screen} from '@testing-library/react'
import NoRooms from './NoRooms'
import * as React from 'react'


describe('NoRooms component', ()=>{

    test('should match the snapshot',()=>{
       const {container}=  render(<NoRooms />)
        expect(container.firstChild).toMatchSnapshot();
      })
    test('should render the text',()=>{
        render(<NoRooms/>);
        screen.getByText(/No rooms at the moment/)
    })

})