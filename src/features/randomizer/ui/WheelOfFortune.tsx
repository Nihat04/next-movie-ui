'use client';

import { useEffect } from 'react';

type propsType = {
    segments: string[];
    segColors: string[];
    winningSegment: string;
    onFinished: (segment: string) => void;
    isOnlyOnce?: boolean;
    size?: number;
    upDuration?: number;
    downDuration?: number;
    fontFamily?: string;
    width?: number;
    height?: number;
};

export function WheelOfFortune({
    segments,
    segColors,
    size = 290,
    fontFamily = 'proxima-nova',
    width = 100,
    height = 100,
}: propsType) {
    const angleCurrent = 0;
    let canvasContext: CanvasRenderingContext2D | null = null;
    const centerX = 300;
    const centerY = 300;

    useEffect(() => {
        wheelInit();
        setTimeout(() => {
            window.scrollTo(0, 1);
        }, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const wheelInit = () => {
        initCanvas();
        wheelDraw();
    };

    const initCanvas = () => {
        let canvas = document.getElementById('canvas');
        if (navigator.appVersion.indexOf('MSIE') !== -1) {
            canvas = document.createElement('canvas');
            canvas.setAttribute('width', width.toString());
            canvas.setAttribute('height', height.toString());
            canvas.setAttribute('id', 'canvas');
            document.getElementById('wheel')?.appendChild(canvas);
        }
        if (canvas && canvas instanceof HTMLCanvasElement) {
            canvasContext = canvas.getContext('2d');
        }
    };

    const wheelDraw = () => {
        clear();
        drawWheel();
        drawNeedle();
    };

    const drawSegment = (key: number, lastAngle: number, angle: number) => {
        const ctx = canvasContext;
        const value = segments[key];
        if (!ctx) {
            throw new Error('ctx does not define');
        }
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, size, lastAngle, angle, false);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fillStyle = segColors[key];
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate((lastAngle + angle) / 2);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 1em ' + fontFamily;
        ctx.fillText(value.substr(0, 21), size / 2 + 20, 0);
        ctx.restore();
    };

    const drawWheel = () => {
        const ctx = canvasContext;
        let lastAngle = angleCurrent;
        const len = segments.length;
        const PI2 = Math.PI * 2;
        if (!ctx) {
            throw new Error('ctx does not define');
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.font = '1em ' + fontFamily;
        for (let i = 1; i <= len; i++) {
            const angle = PI2 * (i / len) + angleCurrent;
            drawSegment(i - 1, lastAngle, angle);
            lastAngle = angle;
        }
    };

    const drawNeedle = () => {
        const ctx = canvasContext;
        if (!ctx) {
            throw new Error('ctx does not define');
        }
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(centerX + 10, centerY - 40);
        ctx.lineTo(centerX - 10, centerY - 40);
        ctx.lineTo(centerX, centerY - 60);
        ctx.closePath();
        ctx.fill();
        const change = angleCurrent + Math.PI / 2;
        let i =
            segments.length -
            Math.floor((change / (Math.PI * 2)) * segments.length) -
            1;
        if (i < 0) i = i + segments.length;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'transparent';
        ctx.font = 'bold 1.5em ' + fontFamily;
    };

    const clear = () => {
        const ctx = canvasContext;
        if (!ctx) {
            throw new Error('ctx does not define');
        }
        ctx.clearRect(0, 0, 1000, 800);
    };

    return (
        <div id="wheel" className="relative w-[600px]">
            <canvas id="canvas" width="600" height="600" />
            <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 btn btn-circle btn-lg">
                spin
            </button>
        </div>
    );
}
