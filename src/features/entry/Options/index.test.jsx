import { render, screen } from '@testing-library/react';

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
