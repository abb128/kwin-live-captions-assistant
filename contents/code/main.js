// (c) 2023 abb128
// This code is licensed under MIT license (see LICENSE.txt for details)

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

// Ideally we would watch the name "net.sapples.LiveCaptions",
// send AllowKeepAbove once, and subscribe to PropertiesChanged.
// However it doesn't seem like there's a way to do this in KWin
// scripts so we just do this any time the Live Captions client is
// activated.
workspace.clientActivated.connect(client => onClientChange(client));
