import { bootstrapCameraKit } from '@snap/camera-kit';

(async function () {
  const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA5NTU4Mjg5LCJzdWIiOiI3NTNkODhjZS0zMDMzLTRmZDEtYmEyNC02NWVhMjIyNTVlYTB-U1RBR0lOR35jN2QwMzRkZi1jMDdiLTRhNDYtODg0Zi05YjYzOTAwYzQxMjcifQ.Y-bEhFEX8hMZfaGQOqTdmVJhRaUzAJGVOcFflk-y-ck',
  });

  const liveRenderTarget = document.getElementById(
    'canvas'
  ) as HTMLCanvasElement;

  const session = await cameraKit.createSession({ liveRenderTarget });

  const resizeCanvas = () => {
    const aspectRatio = window.innerWidth / window.innerHeight;

    // Вычисляем ширину и высоту канваса, сохраняя пропорции изображения
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerWidth / aspectRatio;

    // Если высота канваса превышает высоту окна, устанавливаем ее равной высоте окна
    if (canvasHeight > window.innerHeight) {
      canvasHeight = window.innerHeight;
      canvasWidth = window.innerHeight * aspectRatio;
    }

    liveRenderTarget.style.width = `${canvasWidth}px`;
    liveRenderTarget.style.height = `${canvasHeight}px`;
  };

  window.addEventListener('load', () => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  });

  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  await session.setSource(mediaStream);
  await session.play();

  const lens = await cameraKit.lensRepository.loadLens(
    '37479845-3f35-4ec1-bc9b-27da5d8e7c4b',
    '494bc78d-a48f-4e33-acb6-755155aa529e'
  );

  await session.applyLens(lens);
})();