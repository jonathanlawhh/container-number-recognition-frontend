<template>
  <div style="min-height: 60vh">
    <v-row>
      <v-col cols="12">
        <p class="ma-auto">
          <v-btn variant="outlined" to="/">< Try container number recognition</v-btn>
        </p>
      </v-col>

      <v-col cols="12">
        <div style="position: relative; height: 480px">
          <div id="three"></div>
          <div style="background-color: #e85a45; padding: 8px; position: absolute; top: 35%; right: 0;">
            <h3 class="text-white">Trained with dataset of self captured shipping containers</h3>
            <p>Using a dashcam on my way to work</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import * as THREE from 'three';

import TWEEN from 'three/addons/libs/tween.module.js';
import {TrackballControls} from 'three/addons/controls/TrackballControls.js';
import {CSS3DRenderer, CSS3DObject} from 'three/addons/renderers/CSS3DRenderer.js';

export default {
  name: "tech",
  async mounted() {
    let ctnrTable = []
    for (let i = 0; i < 120; i++) {
      let useIdx = i % 2 + 1
      ctnrTable.push('ctnr_table_' + String(useIdx).padStart(2, '0') + '.webp')
      // ctnrTable.push('ctnr_table_01.webp')
    }

    let camera, scene, renderer;
    let controls;

    const objects = [];
    const targets = {table: [], sphere: [], helix: [], grid: []};

    init();
    animate();

    function init() {

      camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 6000);
      camera.position.z = 500;

      scene = new THREE.Scene();

      // table

      for (let i = 0; i < ctnrTable.length; i ++) {

        const element = document.createElement('img');
        element.className = 'element';
        element.src = '/img/3d/' + ctnrTable[i]
        element.width = 64
        element.height = 96
        element.style.backgroundColor = 'rgba(154,57,39,' + (Math.random() * 0.5 + 0.25) + ')';
        //
        // const number = document.createElement('div');
        // number.className = 'number';
        // number.textContent = (i / 5) + 1;
        // element.appendChild(number);
        //
        // const symbol = document.createElement('div');
        // symbol.className = 'symbol';
        // symbol.textContent = table[i];
        // element.appendChild(symbol);
        //
        // const details = document.createElement('div');
        // details.className = 'details';
        // details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
        // element.appendChild(details);

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add(objectCSS);

        objects.push(objectCSS);

        //

        // const object = new THREE.Object3D();
        // object.position.x = (ctnrTable[i + 3] * 140) - 1330;
        // object.position.y = -(ctnrTable[i + 4] * 180) + 990;
        //
        // targets.table.push(object);

      }

      // grid

      for (let i = 0; i < objects.length; i++) {

        const object = new THREE.Object3D();

        let rand = Math.floor(Math.random() * (1000 - 200 + 1)) + 200
        let randRot = Math.floor(Math.random() * (5 - 0 + 1)) + 0

        object.position.x = ((i % 5) * 400) - rand;
        object.position.y = (-(Math.floor(i / 5) % 5) * 400) + rand;
        object.position.z = (Math.floor(i / 25)) * 200 - 800;
        object.rotation.set(0, randRot, randRot)

        targets.grid.push(object);

      }

      //

      renderer = new CSS3DRenderer();
      renderer.setSize(window.innerWidth - 64, 480);

      document.getElementById('three').appendChild(renderer.domElement);

      //

      controls = new TrackballControls(camera, renderer.domElement);
      controls.minDistance = 0;
      controls.maxDistance = 1000;
      controls.addEventListener('change', render);


      transform(targets.grid, 950);

      //

      window.addEventListener('resize', onWindowResize);

    }

    function transform(targets, duration) {

      TWEEN.removeAll();

      for (let i = 0; i < objects.length; i++) {

        const object = objects[i];
        const target = targets[i];

        new TWEEN.Tween(object.position)
            .to({x: target.position.x, y: target.position.y, z: target.position.z}, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({x: target.rotation.x, y: target.rotation.y, z: target.rotation.z}, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

      }

      new TWEEN.Tween(this)
          .to({}, duration * 2)
          .onUpdate(render)
          .start();

    }

    function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth - 64, 480);

      render();

    }

    function animate() {

      requestAnimationFrame(animate);

      TWEEN.update();

      controls.update();

    }

    function render() {

      renderer.render(scene, camera);

    }
  }
}
</script>

<style scoped>

</style>