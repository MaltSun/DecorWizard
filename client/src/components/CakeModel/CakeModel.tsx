import { useLayoutEffect, useRef, useState } from "react";
import {
  DirectionalLight,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  Box3,
  Vector3,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { useTheme } from "@mui/material/styles";

const CakeModel = () => {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,// Прозрачный фон
    });
    renderer.setClearColor(0x000000, 0); 
    renderer.setSize(400, 400);

    const camera = new PerspectiveCamera(45, 400 / 400, 0.1, 1000);
    camera.position.set(5, 5, 5);

    const scene = new Scene();

    // 4. Освещение (увеличим интенсивность)
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // 5. Загрузка модели
    const fbxLoader = new FBXLoader();


    fbxLoader.load(
      "/model/Strawcupcake/cupcake.fbx", 
      (object) => {
        console.log("Model loaded successfully:", object);

        // Автоматическое масштабирование под размер канваса
        const box = new Box3().setFromObject(object);
        const size = box.getSize(new Vector3()).length();
        const center = box.getCenter(new Vector3());

        // Автомасштабирование
        object.position.x += object.position.x - center.x;
        object.position.y += object.position.y - center.y;
        object.position.z += object.position.z - center.z;

        // Масштабирование
        const scale = 2 / size;
        object.scale.setScalar(scale);

        // Центрирование
        object.position.multiplyScalar(-1);

        scene.add(object);
        setLoading(false);

        // Фокус камеры на модель
        camera.lookAt(center);
      },
      (xhr) => {
        const percent = (xhr.loaded / xhr.total) * 100;
        setProgress(percent);
        console.log(`${percent}% loaded`);
      },
      (error) => {
        console.error("Error loading model:", error);
        setLoading(false);

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0xff0000 });
        const cube = new Mesh(geometry, material);
        scene.add(cube);
        camera.lookAt(cube.position);
      }
    );

    // 6. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Ресайз
    const handleResize = () => {
      camera.aspect = 400 / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(400, 400);
    };

    // Для дебага - принудительный ресайз
    setTimeout(handleResize, 100);

    // 9. Очистка
    return () => {
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "400px", height: "400px" }}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          border: `1px solid ${theme.palette.divider}`,
        }}
      />

      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: theme.palette.common.white,
            background:
              theme.palette.mode === "dark"
                ? theme.palette.grey[800]
                : theme.palette.grey[900],
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Loading: {progress.toFixed(0)}%
        </div>
      )}
    </div>
  );
};

export default CakeModel;
