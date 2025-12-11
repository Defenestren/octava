import { placeholderImages, type ImagePlaceholder } from './placeholder-images';

export type Product = {
    id: string;
    name: string;
    brand: string;
    category: 'Guitarras' | 'Bajos' | 'Amplificadores' | 'Pedales' | 'Baterías';
    price: number;
    description: string;
    image: ImagePlaceholder;
    stock: number;
    specs: Record<string, string>;
};

const defaultGuitarImage = placeholderImages.find(p => p.id === 'product-guitar-1')!;
const defaultBassImage = placeholderImages.find(p => p.id === 'product-guitar-2')!;
const defaultAmpImage = placeholderImages.find(p => p.id === 'product-amp-1')!;
const defaultPedalImage = placeholderImages.find(p => p.id === 'product-pedal-1')!;
const defaultDrumImage = placeholderImages.find(p => p.id === 'product-drum-1')!;

export const products: Product[] = [
    {
        id: 'prod_001',
        name: 'Guitarra Eléctrica ST Vintage',
        brand: 'Fender',
        category: 'Guitarras',
        price: 1250.00,
        description: 'Un clásico atemporal con el sonido y la sensación que solo una Fender puede ofrecer. Perfecta para rock, blues y country.',
        image: { id: 'prod_img_st_vintage', imageUrl: '/7-23.png', description: 'Guitarra Eléctrica ST Vintage', imageHint: 'electric guitar' },
        stock: 15,
        specs: {
            'Tipo de pastillas': 'Single-Coil',
            'Cuerpo': 'Aliso',
            'Mástil': 'Arce',
        }
    },
    {
        id: 'prod_002',
        name: 'Guitarra LP Standard \'50s',
        brand: 'Gibson',
        category: 'Guitarras',
        price: 2800.00,
        description: 'El sonido icónico del rock. Tono grueso, sustain infinito y una estética que nunca pasa de moda.',
        image: { id: 'prod_img_002', description: 'Guitarra tipo LP', imageUrl: '/gibson-les-paul-standard-50s-tobacco-burst.webp', imageHint: 'les paul guitar' },
        stock: 8,
        specs: {
            'Tipo de pastillas': 'Humbucker BurstBucker',
            'Cuerpo': 'Caoba con tapa de arce',
            'Mástil': 'Caoba',
        }
    },
    {
        id: 'prod_003',
        name: 'Bajo Precision Bass',
        brand: 'Fender',
        category: 'Bajos',
        price: 1400.00,
        description: 'El bajo que lo empezó todo. Sonido potente y redondo que ha definido géneros enteros.',
        image: defaultBassImage,
        stock: 12,
        specs: {
            'Tipo de pastillas': 'Split-Coil',
            'Cuerpo': 'Aliso',
            'Mástil': 'Arce',
        }
    },
    {
        id: 'prod_004',
        name: 'Amplificador Twin Reverb',
        brand: 'Fender',
        category: 'Amplificadores',
        price: 1800.00,
        description: 'El rey de los limpios. 85 vatios de pura potencia valvular con una reverb y trémolo legendarios.',
        image: defaultAmpImage,
        stock: 10,
        specs: {
            'Potencia': '85W',
            'Tipo': 'Válvulas',
            'Altavoces': '2x12" Jensen C12K',
        }
    },
    {
        id: 'prod_005',
        name: 'Amplificador JCM800',
        brand: 'Marshall',
        category: 'Amplificadores',
        price: 2200.00,
        description: 'El rugido del rock de los 80. Un cabezal de un solo canal que ofrece la distorsión más pura y agresiva.',
        image: { id: 'prod_img_005', description: 'Cabezal de amplificador Marshall', imageUrl: '/2-1200x1200.webp', imageHint: 'marshall amplifier' },
        stock: 7,
        specs: {
            'Potencia': '100W',
            'Tipo': 'Válvulas',
            'Canales': '1',
        }
    },
    {
        id: 'prod_006',
        name: 'Pedal Overdrive Vintage',
        brand: 'Ibanez',
        category: 'Pedales',
        price: 180.00,
        description: 'El pedal de overdrive verde más famoso de la historia. Perfecto para empujar tu ampli a una saturación cálida y cremosa.',
        image: { id: 'prod_img_006', description: 'Pedal de Overdrive Ibanez', imageUrl: '/s-l500.webp', imageHint: 'ibanez pedal' },
        stock: 30,
        specs: {
            'Tipo de efecto': 'Overdrive',
            'Bypass': 'Buffered',
            'Alimentación': '9V',
        }
    },
     {
        id: 'prod_007',
        name: 'Bajo 4003',
        brand: 'Rickenbacker',
        category: 'Bajos',
        price: 2600.00,
        description: 'Un sonido de bajo distintivo con agudos penetrantes y graves sólidos. Famoso en el rock progresivo y el post-punk.',
        image: { id: 'prod_img_007', description: 'Bajo Rickenbacker 4003', imageUrl: '/rickenbacker-4003sw-natural-walnut-xl.webp', imageHint: 'rickenbacker bass' },
        stock: 5,
        specs: {
            'Tipo de pastillas': 'Single-Coil',
            'Cuerpo': 'Arce',
            'Mástil': 'Arce (a través del cuerpo)',
        }
    },
    {
        id: 'prod_008',
        name: 'Guitarra Acústica D-28',
        brand: 'Martin',
        category: 'Guitarras',
        price: 3500.00,
        description: 'La dreadnought por excelencia. Un estándar en la música folk, bluegrass y country con un tono rico y potente.',
        image: { id: 'prod_img_008', description: 'Guitarra acústica', imageUrl: 'https://picsum.photos/seed/acoustic-guitar/600/600', imageHint: 'acoustic guitar' },
        stock: 9,
        specs: {
            'Tipo': 'Acústica (Dreadnought)',
            'Tapa': 'Abeto de Sitka',
            'Aros y fondo': 'Palosanto de India Oriental',
        }
    },
    {
        id: 'prod_009',
        name: 'Batería Ludwig Classic Maple',
        brand: 'Ludwig',
        category: 'Baterías',
        price: 3200.00,
        description: 'El sonido que definió el rock. Tono cálido, resonante y versátil, hecho en EE.UU.',
        image: defaultDrumImage,
        stock: 4,
        specs: {
            'Material': 'Arce de 7 capas',
            'Configuración': '3 piezas (Bombo, Tom, Tom de piso)',
            'Acabado': 'Vintage Black Oyster',
        }
    }
];
