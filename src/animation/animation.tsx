import P5 from 'p5';

export default class AbilityImg {
    private _p5: P5;
    private name: string;
    private yPos: number;
    private xPos: number;
    private xSpeed: number;
    private img: P5.Image;
    private visible: boolean
    private isVillain: boolean;

    constructor(p5: P5, name: string, showSketch: boolean, isVillain: boolean, y: number) {
        this._p5 = p5;
        this.name = name;
        this.yPos = y;
        this.xPos = isVillain ? 550 : 0;
        this.xSpeed = 10;
        this.img = p5.loadImage(this.name);
        this.visible = showSketch;
        this.isVillain = isVillain;
    }

    createAbilityImg() {
        const p5 = this._p5;
        if (this.img && this.visible) {
            p5.push();
            p5.translate(this.xPos, this.yPos);
            
            if (this.isVillain) {
                p5.scale(-1, 1); 
                p5.image(this.img, -this.img.width, 0);
            } else {
                p5.image(this.img, 0, 0);
            }

            p5.pop();
        }
    }

    getName() {
        return this.name;
    }

    moveAbilityImg() {
        const p5 = this._p5;
        this.xPos += this.isVillain ? -this.xSpeed : +this.xSpeed;

        if (this.xPos > p5.width || this.xPos + this.img.width < 0) {
            this.visible = false;
        }
    }
}
