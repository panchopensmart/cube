import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.engine = new BABYLON.Engine(this.canvas, true);
        this.scene = new BABYLON.Scene(this.engine);
        this.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -10), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), this.scene);
        this.box = BABYLON.MeshBuilder.CreateBox('box', { size: 4 }, this.scene);
        this.material = new BABYLON.StandardMaterial('material', this.scene);
        this.material.diffuseColor = new BABYLON.Color3(0, 1, 0);
        this.box.material = this.material;
        this.score = 0;
        this.scoreText = null;
        this.boxSpeed = 0.05;
        this.gameOver = false;
        this.engine.runRenderLoop(() => {
            this.scene.render();
            if (!this.gameOver) {
                this.box.position.z += this.boxSpeed;
                if (this.box.position.z > 10) {
                    this.box.position.z = -10;
                    this.score += 1;
                    this.updateScore();
                }
            }
        });
    }

    start() {
        this.scoreText = new GUI.TextBlock('score', `Счёт: ${this.score}`);
        this.scoreText.color = 'white';
        this.scoreText.fontSize = 24;
        this.scoreText.top = '140px';
        this.scoreText.left = '10px';
        this.scoreText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.scoreText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        GUI.AdvancedDynamicTexture.CreateFullscreenUI('ui', true, this.scene).addControl(this.scoreText);
        this.canvas.addEventListener('click', () => {
            if (!this.gameOver) {
                this.boxSpeed += 0.01;
            }
        });
    }

    updateScore() {
        this.scoreText.text = `Счёт: ${this.score}`;
        if (this.score >= 15) {
            this.gameOver = true;
            const gameOverText = new GUI.TextBlock('gameOver', 'Игра закончена');
            gameOverText.color = 'white';
            gameOverText.fontSize = 30;
            gameOverText.top = '10px';
            gameOverText.left = '10px';
            gameOverText.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            gameOverText.textVerticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
            GUI.AdvancedDynamicTexture.CreateFullscreenUI('ui', true, this.scene).addControl(gameOverText);
        }
    }
}
export default Game;