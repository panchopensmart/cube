import React , { useEffect, useRef } from 'preact/compat';
import Game from './Game.js';
import '../styles/scene.css'

function Scene() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const game = new Game(canvasRef.current.id);
        game.start();
    }, []);

    return <canvas ref={canvasRef} id="canvas" />;
}

export default Scene;