import { React } from "react"

class OnlineIndicator extends React.Component {

    constructor(props) {
        super(props);
    }

    isOnline() {
        return navigator.onLine;
    }
}

//export Offline = new OfflineComp;
