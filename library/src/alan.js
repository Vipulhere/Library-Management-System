import React, { useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
function Alan() {
 
    useEffect(() => {
      
      alanBtn({
        key: '77bfc49ed178f3e5d64612a1175c3e0c2e956eca572e1d8b807a3e2338fdd0dc/stage'
      });
     // eslint-disable-next-line 
    }, []);
  return (
   

  <div style={{position:"fixed", bottom:"100px", right:"4px"}}>
    
<Menu >
  <MenuButton
    as={IconButton}
    // aria-label='Options'
    icon={< InfoOutlineIcon />}
    variant='outline'
    border={"none"}
  />
  <MenuList>
    <MenuItem >
     Try Saying... <br/>
     -> Hi/Hello <br/>
     -> Who are you?<br/>
     -> Tell me about this website<br/>
     -> Open (specific) page<br/>
     -> Show me the projects?<br/>
     More coming soon...
    </MenuItem>
  </MenuList>
</Menu>
</div>
  )
}

export default Alan