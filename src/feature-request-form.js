import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";

import { Button } from "azure-devops-ui/Button";
import { Header } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { TextField } from "azure-devops-ui/TextField";

import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { WorkItemTrackingServiceIds } from "azure-devops-extension-api/WorkItemTracking";

const summaryObservable = new ObservableValue("");
const descriptionObservable = new ObservableValue("");

class FeatureRequestForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            description: '',
            workItemTypeValue: "Feature"
        };

        this.onCreateClick = this.onCreateClick.bind(this);
    }

    componentDidMount() {
        SDK.init();
    }

    render() {
        return (
            <Page className="feature-request-form-hub flex-grow">
                <Header title="Feature Request Form" />
                <div className="page-content">
                    <div>
                        <TextField label="Summary" value={summaryObservable} onChange={(e, newValue) => (summaryObservable.value = newValue)}/>
                        <TextField label="Description" value={descriptionObservable} multiline="true" onChange={(e, newValue) => (descriptionObservable.value = newValue)}/>
                        <br />
                        <Button primary="true" className="create-button" text="Create" onClick={() => this.onCreateClick()} />
                    </div>
                </div>
            </Page>
        );
    }

    onCreateClick() {
        var navSvc = SDK.getService(WorkItemTrackingServiceIds.WorkItemFormNavigationService);
        navSvc.then(x => {
            x.openNewWorkItem(this.state.workItemTypeValue, {
                Title: summaryObservable.value,
                Tags: "",
                priority: 1,
                "System.AssignedTo": SDK.getUser().name,
                Description: descriptionObservable.value
            })
            // var t = SDK.getService(WorkItemTrackingServiceIds.WorkItemFormService);
            // t.then(y => {
            //     y.save();
            // })
        }
        );
    }
}

export default FeatureRequestForm;
