// Card image frame: max card width (max-w-70 = 280px) × frame height (180px).
export const CARD_IMAGE_WIDTH = 280;
export const CARD_IMAGE_HEIGHT = 180;

// Request 2x the frame size so images stay sharp on high-DPI screens.
export const IMAGE_DPR = 2;

export const CARD_IMAGE_SRC_WIDTH = CARD_IMAGE_WIDTH * IMAGE_DPR;
export const CARD_IMAGE_SRC_HEIGHT = CARD_IMAGE_HEIGHT * IMAGE_DPR;
