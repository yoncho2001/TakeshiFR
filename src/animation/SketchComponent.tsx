import { useEffect } from 'react';
import P5 from 'p5';
import AbilityImg from "./animation";

interface SketchComponentProps {
    abilityImgRaw: string,
    showSketch: boolean,
    isVillain: boolean
}

export default function SketchComponent({ abilityImgRaw, showSketch, isVillain }: SketchComponentProps) {
    useEffect(() => {
        let renderIMG: P5;

        const sketch = (p5: P5) => {
            const abilityImg = new AbilityImg(p5, abilityImgRaw, showSketch, isVillain, 380);

            p5.preload = () => {
               p5.loadImage(abilityImgRaw);
            };

            p5.setup = () => {
                const canvas = p5.createCanvas(615, 600);
                canvas.parent("root");
                abilityImg.createAbilityImg();
            };

            p5.draw = () => {
                p5.clear();
                //p5.background("white");
                abilityImg.createAbilityImg();
                abilityImg.moveAbilityImg();
            };
        };

        renderIMG = new P5(sketch);

        return () => {
            renderIMG.remove();
        };
    }, []);

    return <div id="abilityImgContainer"></div>;
}