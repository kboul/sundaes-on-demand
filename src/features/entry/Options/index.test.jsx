import userEvent from '@testing-library/user-event';

import { render, screen } from '../../../testUtils';

import Options from '.';

test('displays image for each scoop option from server', async () => {
    render(<Options optionType="scoops" />);

    // find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    // confirm alt text of images
    const imageTitles = scoopImages.map(element => element.alt);
    expect(imageTitles).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('displays image for each topping option from server', async () => {
    render(<Options optionType="toppings" />);

    const toppingsImage = await screen.findAllByRole('img', {
        name: /topping$/i
    });
    expect(toppingsImage).toHaveLength(3);

    // confirm alt text of images
    const imageTitles = toppingsImage.map(element => element.alt);
    expect(imageTitles).toEqual([
        'Cherries topping',
        'M&Ms topping',
        'Hot fudge topping'
    ]);
});

test('update scoop subtotal when scoops change', async () => {
    render(<Options optionType="scoops" />);

    // make sure total starts at $0.00
    const scoopsSubtotal = screen.getByText('Scoops total: $', {
        exact: false
    });
    expect(scoopsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check subtotal
    const vanillaInput = await screen.findByRole('spinbutton', {
        name: 'Vanilla'
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');
    expect(scoopsSubtotal).toHaveTextContent('2.00');

    // update chocolate scoops to 2 and check subtotal
    const chocolateInput = await screen.findByRole('spinbutton', {
        name: 'Chocolate'
    });
    userEvent.clear(chocolateInput);
    userEvent.type(chocolateInput, '2');
    expect(scoopsSubtotal).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async () => {
    render(<Options optionType="toppings" />);

    const toppingsSubtotal = screen.getByText('Toppings total: $', {
        exact: false
    });
    expect(toppingsSubtotal).toHaveTextContent('0.00');

    // update vanilla scoops to 1 and check subtotal
    const hotFudgeInput = await screen.findByRole('checkbox', {
        name: 'Hot fudge'
    });
    userEvent.click(hotFudgeInput, '1');
    expect(toppingsSubtotal).toHaveTextContent('1.50');

    // add Cherries and check subtotal
    const cherriesInput = await screen.findByRole('checkbox', {
        name: 'Cherries'
    });
    userEvent.click(cherriesInput, '1');
    expect(toppingsSubtotal).toHaveTextContent('3');

    // remove cherries and check subtotal
    userEvent.click(cherriesInput, '1');
    expect(toppingsSubtotal).toHaveTextContent('1.50');
});
