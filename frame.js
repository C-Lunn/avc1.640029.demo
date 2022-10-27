async function load50frame() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const r = await fetch('0.1.640029.h264');
    const blob = await (await r.blob()).arrayBuffer();
    console.log("Received h.264 50Hz frame");
    const config = {
        codec: "avc1.640029",
        codedWidth: 1920,
        codedHeight: 1080,
        optimizeForLatency: true
    };

    const init = {
        output: (f) => {
            console.log("Decoded frame", f);
            ctx.drawImage(f, 0, 0);
        },
        error: (e) => {
            console.log(e);
        },
    };

    const { supported } = await VideoDecoder.isConfigSupported(config);
    let decoder;
    if (supported) {
        decoder = new VideoDecoder(init);
        decoder.configure(config);
    } else {
        throw new Error("CONFIG NOT SUPPORTED", config);
    }

    const chunk_buf = new Uint8Array(blob);
    const chunk = new EncodedVideoChunk({
        timestamp: 0,
        type: "key",
        data: chunk_buf
    });

    decoder.decode(chunk);

}

async function load25frame() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const r = await fetch('0.1.25Hz.640029.h264');
    const blob = await (await r.blob()).arrayBuffer();
    console.log("Received h.264 25Hz frame");
    const config = {
        codec: "avc1.640029",
        codedWidth: 1920,
        codedHeight: 1080,
        optimizeForLatency: true
    };

    const init = {
        output: (f) => {
            console.log("Decoded frame", f);
            ctx.drawImage(f, 0, 0);
        },
        error: (e) => {
            console.log(e);
        },
    };

    const { supported } = await VideoDecoder.isConfigSupported(config);
    let decoder;
    if (supported) {
        decoder = new VideoDecoder(init);
        decoder.configure(config);
    } else {
        throw new Error("CONFIG NOT SUPPORTED", config);
    }

    const chunk_buf = new Uint8Array(blob);
    const chunk = new EncodedVideoChunk({
        timestamp: 0,
        type: "key",
        data: chunk_buf
    });

    decoder.decode(chunk);

}