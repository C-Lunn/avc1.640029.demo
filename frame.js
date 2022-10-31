let fd = 0;

async function load50frame() {
    const canvas = document.getElementById("canvas");
    const fba = document.getElementById("fb-area");
    const ctx = canvas.getContext("2d");
    const config = {
        codec: "avc1.640029",
        codedWidth: 1920,
        codedHeight: 1080
    };

    const init = {
        output: (f) => {
            console.log("Decoded frame", f);
            document.getElementById('fd-area').innerHTML = `Frames Decoded: ${fd++}`;
            ctx.drawImage(f, 0, 0);
        },
        error: (e) => {
            console.log(e);
            throw(e);
        },
    };

    const { supported } = await VideoDecoder.isConfigSupported(config);
    let decoder;
    if (supported) {
        decoder = new VideoDecoder(init);
        decoder.configure(config);
    } else {
        fba.innerHTML = "CONFIG NOT SUPPORTED";
        throw new Error("CONFIG NOT SUPPORTED", config);
    }

    let t = 0;

    for (let i = 1; i < 101; i++) {
        const r = await fetch(`chunks${i}.h264`);
        const blob = await r.blob();
        const chunk_buf = new Uint8Array(await blob.arrayBuffer());
        const chunk = new EncodedVideoChunk({
            timestamp: t,
            type: i == 0 ? "key": "delta",
            data: chunk_buf
        });
        t += 1e6 / 50;
        decoder.decode(chunk);
        setTimeout(() => {
            fba.innerHTML = `DECODER STATUS: ${decoder.state}; DECODER QUEUE SIZE: ${decoder.decodeQueueSize ?? 'N/A'}`;
        }, 100);
    }

}
