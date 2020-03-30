import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Button,
    Pane
} from 'evergreen-ui';

export default function App(){
    return (
        <Pane display = 'flex' height = '100vh'>
            <Pane margin = 'auto'>
                <Link to ='/chat'>
                    <Button appearance="primary"> Start Chatting! </Button>
                </Link>
            </Pane>
            
        </Pane>
    )
}