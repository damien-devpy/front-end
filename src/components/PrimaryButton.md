## Examples

```js
<div> <PrimaryButton>Validate</PrimaryButton> </div>
<AddNewButton text='Add new participant' />
<div> <button class="btn btn-custom-lot active">Validate</button> </div>
```

### Button variants and groups

Simple `PrimaryButton`
```js
import PrimaryButton from './PrimaryButton';

<div>
<PrimaryButton>lot</PrimaryButton>
<PrimaryButton active>active</PrimaryButton>
<PrimaryButton disabled>disabled</PrimaryButton>
</div>
```

`Button` variant = primary/outline-primary
```js
import { Button, ButtonGroup } from 'react-bootstrap';

<div>
<ButtonGroup>
<Button variant='outline-primary'>lot</Button>
<Button variant='outline-primary' active>active</Button>
<Button variant='outline-primary' disabled>disabled</Button>
<Button variant='outline-primary' disabled active>disabled active</Button>
</ButtonGroup>
<br/>
<br/>
<ButtonGroup>
<Button variant='primary'>lot</Button>
<Button variant='primary' active>active</Button>
<Button variant='primary' disabled>disabled</Button>
<Button variant='primary' disabled active>disabled active</Button>
</ButtonGroup>
</div>
```

`ToggleButton` with variants
```js
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

<div>
<ButtonGroup toggle>
<ToggleButton variant='outline-primary' type='checkbox'>lot</ToggleButton>
<ToggleButton variant='outline-primary' type='checkbox' checked>checked</ToggleButton>
<ToggleButton variant='outline-primary' type='checkbox' disabled>disabled</ToggleButton>
<ToggleButton variant='outline-primary' type='checkbox' disabled checked>disabled checked</ToggleButton>
</ButtonGroup>
<br/>
<br/>
<ButtonGroup toggle>
<ToggleButton variant='outline-secondary' type='checkbox'>lot</ToggleButton>
<ToggleButton variant='outline-secondary' type='checkbox' checked>checked</ToggleButton>
<ToggleButton variant='outline-secondary' type='checkbox' disabled>disabled</ToggleButton>
<ToggleButton variant='outline-secondary' type='checkbox' checked disabled>disabled checked</ToggleButton>
</ButtonGroup>
<br/>
<br/>
<ButtonGroup toggle>
<ToggleButton variant='outline-info' type='checkbox'>lot</ToggleButton>
<ToggleButton variant='outline-info' type='checkbox' checked>checked</ToggleButton>
<ToggleButton variant='outline-info' type='checkbox' disabled>disabled</ToggleButton>
<ToggleButton variant='outline-info' type='checkbox' checked disabled>disabled checked</ToggleButton>
</ButtonGroup>
<br/>
<br/>
<ButtonGroup toggle>
<ToggleButton variant='primary' type='checkbox'>lot</ToggleButton>
<ToggleButton variant='primary' type='checkbox' checked>checked</ToggleButton>
<ToggleButton variant='primary' type='checkbox' disabled>disabled</ToggleButton>
<ToggleButton variant='primary' type='checkbox' checked disabled>disabled checked</ToggleButton>
</ButtonGroup>
<br/>
<br/>
<ButtonGroup toggle>
<ToggleButton variant='secondary' type='checkbox'>lot</ToggleButton>
<ToggleButton variant='secondary' type='checkbox' checked>checked</ToggleButton>
<ToggleButton variant='secondary' type='checkbox' disabled>disabled</ToggleButton>
<ToggleButton variant='secondary' type='checkbox' checked disabled>disabled checked</ToggleButton>
</ButtonGroup>
<br/>
<br/>
<ButtonGroup toggle>
<ToggleButton variant='info' type='checkbox'>lot</ToggleButton>
<ToggleButton variant='info' type='checkbox' checked>checked</ToggleButton>
<ToggleButton variant='info' type='checkbox' disabled>disabled</ToggleButton>
<ToggleButton variant='info' type='checkbox' checked disabled>disabled checked</ToggleButton>
</ButtonGroup>
</div>
```


Using custom css `btn-custom-lot` with `PrimaryButton`
```js
import PrimaryButton from './PrimaryButton';

<div>
<PrimaryButton className="btn-custom-lot">lot</PrimaryButton>
<PrimaryButton className="btn-custom-lot" active>active</PrimaryButton>
<PrimaryButton className="btn-custom-lot" disabled>disabled</PrimaryButton>
</div>
```

Using custom css `btn-custom-lot` with `Button`
```js
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

<div>
<Button variant='outline-primary'>lot</Button>
<Button active className='btn-outline-primary'>active</Button>
<Button disabled>disabled</Button>
<Button className="btn-custom-lot">lot</Button>
<Button className="btn-custom-lot" active>active</Button>
<Button className="btn-custom-lot" disabled>disabled</Button>
</div>
```

