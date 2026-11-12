// Image assets copied from the Figma Code Layer prototype (Workflow lab, node 10:3884).
// Icons are not here: they come from @heroicons/react, the icon set the Pickup design system ships.
const a = (f: string) => `${import.meta.env.BASE_URL}assets/${f}`;

export const assets = {
  avatar: a('9607b.png'),
  sellerAvatar: a('fd863.png'),
  promoFurniture: a('f0e19.png'),
  promoPopular: a('bf8f6.png'),
  headphones: a('a7ef9.png'),
  blanket: a('791bd.png'),
  plant: a('6220e.png'),
  jacket: a('42552.png'),
  attribution: a('7ca7a.png'),
  mapBrowse: a('92c52.png'),
  mapProduct: a('75255.png'),
  mapCheckout: a('fe274.png'),
  mapStatus: a('0200a.png'),
};

/** Map pins from "Browse by map", in design paint order (later pins sit on top). */
export const mapPins: { left: number; top: number; w: number; img: string; price: string }[] = (
  [
    [256, 460, 64, 'ceffd.png', '$71'],
    [147, 367, 64, '5b64a.png', '$80'],
    [176, 159, 64, '3c3f5.png', '$55'],
    [161, 293, 64, '73d00.png', '$40'],
    [256, 460, 64, '1433e.png', '$46'],
    [44, 311, 74, '82c32.png', '$1,218'],
    [113, 246, 64, '750b5.png', '$538'],
    [258, 252, 64, 'cd53b.png', '$40'],
    [49, 311, 64, '53eb9.png', '$151'],
    [299, 331, 74, 'ca18c.png', '$1,218'],
    [176, 159, 64, '4bfb5.png', '$122'],
    [479, 395, 64, 'dc62c.png', '$63'],
    [112, 278, 64, 'bf368.png', '$29'],
    [167, 490, 64, '02317.png', '$223'],
    [143, 546, 64, 'b734c.png', '$92'],
    [257, 332, 64, '62a15.png', '$155'],
    [112, 440, 64, '76549.png', '$15'],
    [167, 490, 64, 'e102d.png', '$155'],
    [77, 256, 74, '3f765.png', '$1,555'],
    [161, 293, 64, 'e55b6.png', '$24'],
    [257, 332, 64, '5457a.png', '$139'],
    [330, 356, 64, '3bc06.png', '$105'],
    [298, 530, 64, '15ca9.png', '$46'],
    [479, 395, 64, 'a376b.png', '$80'],
    [112, 440, 64, '142df.png', '$38'],
    [258, 252, 64, '82bfc.png', '$32'],
    [147, 367, 64, '9df5e.png', '$35'],
    [214, 515, 64, 'eaf77.png', '$27'],
    [257, 332, 64, '976f5.png', '$185'],
    [298, 530, 64, 'c4fb0.png', '$20'],
    [143, 546, 64, 'c41d8.png', '$185'],
    [251, 257, 64, 'a4ab2.png', '$147'],
    [622, 356, 64, '24e7a.png', '$748'],
    [622, 356, 64, '9a850.png', '$76'],
    [108, 520, 64, '0659c.png', '$155'],
  ] as const
).map(([left, top, w, img, price]) => ({ left, top, w, img: a(img), price }));
