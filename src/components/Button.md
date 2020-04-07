Default `Button`

    <ButtonsGroup>
      <Button>Default button</Button>
      <Button disabled>Default button</Button>
    </ButtonsGroup>

Active `Button`

    initialState = { job: true };
    <ButtonsGroup>
      <Button active={state.job} onClick={() => setState({ job: true })}>Trouver un job</Button>
      <Button active={!state.job} onClick={() => setState({ job: false })}>Trouver un talent</Button>
    </ButtonsGroup>

Primary `Button`

    <ButtonsGroup>
      <Button primary>Primary button</Button>
      <Button primary disabled>Primary button</Button>
    </ButtonsGroup>

Secondary `Button`

    <ButtonsGroup>
      <Button secondary>Secondary button</Button>
      <Button secondary disabled>Secondary button</Button>
    </ButtonsGroup>

Large, medium and small `Button`s

    <ButtonsGroup>
      <Button large>Large button</Button>
      <Button medium>Medium button</Button>
      <Button small>Small button</Button>
    </ButtonsGroup>

`Button` with custom `onClick` prop

    <Button onClick={() => alert('Foobar')}>Foobar alert</Button>

Use `ButtonsGroup` to apply correct margins around `Button`s

    <ButtonsGroup>
      <Button>Button One</Button>
      <Button>Button Two</Button>
      <Button>Button Three</Button>
    </ButtonsGroup>
