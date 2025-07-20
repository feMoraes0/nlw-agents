import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

type RecordRoomsParams = {
  roomId: string;
};

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

export function RecordRoomAudio() {
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const { roomId } = useParams<RecordRoomsParams>();

  if (!roomId) {
    return <Navigate replace to="/" />;
  }

  async function uploadAudioRecord(audio: Blob) {
    const formData = new FormData();
    formData.append("file", audio, "audio.webm");
    const response = await fetch(
      `http://localhost:3333/rooms/${roomId}/audio`,
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    console.log(result);
  }

  function stopRecording() {
    setIsRecording(false);
    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Seu navegador não suporta gravação.");
      return;
    }
    setIsRecording(true);
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size) uploadAudioRecord(event.data);
    };
    recorder.current.onstart = () => console.log("Gravação iniciada");
    recorder.current.onstop = () => console.log("Gravação pausada");
    recorder.current.start();
  }

  return (
    <div className="h-screen flex justify-center items-center flex-col gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar áudio</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}
      <p>{isRecording ? "Gravando..." : "Pausado"}</p>
    </div>
  );
}
