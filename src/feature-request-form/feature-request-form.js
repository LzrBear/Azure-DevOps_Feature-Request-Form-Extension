import * as React from "react";
import * as SDK from "azure-devops-extension-sdk";

// import "./WorkItemOpen.scss";

import { Button } from "azure-devops-ui/Button";
import { ObservableArray, ObservableValue } from "azure-devops-ui/Core/Observable";
import { localeIgnoreCaseComparer } from "azure-devops-ui/Core/Util/String";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { ListSelection } from "azure-devops-ui/List";
import { IListBoxItem } from "azure-devops-ui/ListBox";
import { Header } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { TextField } from "azure-devops-ui/TextField";

import { CommonServiceIds, getClient, IProjectPageService } from "azure-devops-extension-api";
import { IWorkItemFormNavigationService, IWorkItemFormService, WorkItemTrackingRestClient, WorkItemTrackingServiceIds } from "azure-devops-extension-api/WorkItemTracking";

import { showRootComponent } from "../Common";


class WorkItemOpenContent extends React.Component {

    // workItemIdValue = new ObservableValue("1");
    // workItemTypeValue = new ObservableValue("Bug");
    // selection = new ListSelection();
    // workItemTypes = new ObservableArray();

    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        SDK.init();
        this.loadWorkItemTypes();
    }

    render() {
        return (
            <>
                <Page className="sample-hub flex-grow">
                    <Header title="Feature Request Form" />
                    <div className="page-content">
                        <div>
                            <label>Description</label>
                            <textarea onChange={this.handleChange}></textarea>
                            <Button className="sample-work-item-button" text="Create" onClick={() => this.onCreateClick()} />
                        </div>
                    </div>
                </Page>
            </>
        );
    }

    onOpenNewWorkItemClick() {
        const navSvc = await SDK.getService(WorkItemTrackingServiceIds.WorkItemFormNavigationService);
        navSvc.openNewWorkItem(this.workItemTypeValue.value, {
            Title: "Opened a work item from the Work Item Nav Service",
            Tags: "extension;wit-service",
            priority: 1,
            "System.AssignedTo": SDK.getUser().name,
        });
    };

    handleChange(event) { this.setState({ value: event.target.value }); }

    onCreateClick() {
        const navSvc = await SDK.getService(WorkItemTrackingServiceIds.WorkItemFormNavigationService);
        navSvc.openNewWorkItem(this.workItemTypeValue.value, {
            Title: "Test Item 1",
            Tags: "extension;wit-service",
            priority: 1,
            "System.AssignedTo": SDK.getUser().name,
            Description: this.state.value
        });
        const t = await SDK.getService(WorkItemTrackingServiceIds.WorkItemFormService);
        t.save();
    }
}

showRootComponent(<WorkItemOpenContent />);