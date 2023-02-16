function setKeepAbove(keepAbove) {
    const liveCaptionsClient = workspace.clientList().find(client => client.caption === "Live Captions");

    if(liveCaptionsClient === undefined) {
        print("Failed to find live captions");
        return;
    }

    liveCaptionsClient.keepAbove = keepAbove;
}

function updateKeepAbove() {
    callDBus(
        "net.sapples.LiveCaptions",
        "/net/sapples/LiveCaptions/External",
        "net.sapples.LiveCaptions.External",
        "AllowKeepAbove"
    );

    callDBus(
        "net.sapples.LiveCaptions",
        "/net/sapples/LiveCaptions/External",
        "org.freedesktop.DBus.Properties",
        "Get",
        "net.sapples.LiveCaptions.External",
        "KeepAbove",
        setKeepAbove
    );
}


function onClientChange(client) {
    if(client === null) return;
    if(client.caption === "Live Captions"){
        updateKeepAbove();
    }
}

workspace.clientActivated.connect(client => onClientChange(client));
