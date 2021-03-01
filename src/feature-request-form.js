import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";

// import "./WorkItemOpen.scss";

import { Button } from "azure-devops-ui/Button";
// import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
// import { localeIgnoreCaseComparer } from "azure-devops-ui/Core/Util/String";
// import { Dropdown } from "azure-devops-ui/Dropdown";
// import { ListSelection } from "azure-devops-ui/List";
// import { IListBoxItem } from "azure-devops-ui/ListBox";
import { Header } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
// import { TextField } from "azure-devops-ui/TextField";

// import { CommonServiceIds, getClient, IProjectPageService } from "azure-devops-extension-api";
import { IWorkItemFormNavigationService, IWorkItemFormService, WorkItemTrackingRestClient, WorkItemTrackingServiceIds } from "azure-devops-extension-api/WorkItemTracking";

// import { showRootComponent } from "../Common";


class FeatureRequestForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            summary: '',
            description: '',
            workItemTypeValue: "Feature"
        };

        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSummaryChange = this.handleSummaryChange.bind(this);
        this.onCreateClick = this.onCreateClick.bind(this);
    }

    componentDidMount() {
        SDK.init();
    }

    render() {
        return (
            <Page className="sample-hub flex-grow">
                <Header title="Feature Request Form" />
                <div className="page-content">
                    <div>
                        <label>Summary</label>
                        <br/>
                        <textarea onChange={this.handleSummaryChange}></textarea>
                        <br/>
                        <br/>
                        <label>Description</label>
                        <br/>
                        <textarea onChange={this.handleDescriptionChange}></textarea>
                        <br/>
                        <br/>
                        <Button className="sample-work-item-button" text="Create" onClick={() => this.onCreateClick()} />
                    </div>
                </div>
            </Page>
        );
    }

    handleSummaryChange(event) {
        this.setState({ summary: event.target.value });
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    onCreateClick() {
        var navSvc = SDK.getService(WorkItemTrackingServiceIds.WorkItemFormNavigationService);
        navSvc.then(x => {
            x.openNewWorkItem(this.state.workItemTypeValue, {
                Title: this.state.summary,
                Tags: "",
                priority: 1,
                "System.AssignedTo": SDK.getUser().name,
                Description: this.state.description
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
