import * as React from 'react';
import "./chart.css";
import {Person,ExtendedPerson,IChartProps} from '../asset/dataTypes';


export function OrgChart({ tree, NodeComponent }: IChartProps) {
    const list_to_tree = (list: ExtendedPerson[]) => {
        var map: { [id: string]: number; } = {}, node: ExtendedPerson, roots: ExtendedPerson[] = [], i;

        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; // initialize the map
            list[i].children1 = []; // initialize the children
        }

        list.forEach((ele, i) => {
            node = list[i];
            if (node.parents.length !== 0) {
                // if you have dangling branches check that map[node.parentId] exists
                if (list !== undefined && node.parents.length > 0) {
                    list[map[node.parents[0]]].children1?.push(node);
                }
            } else {
                roots.push(node);
            }
        });
        return roots;
    }

    const convertTree = (initialPersons: Person[]) => {
        //templist
        let flatTree: ExtendedPerson[] = initialPersons;

        initialPersons.forEach(x => {
            //assumtion no more than 2 parents
            if (x.parents.length === 2) {
                //select parents
                let selectedParents = initialPersons.filter(y => x.parents.includes(y.id))
                    .sort((a, b) => b.parents.length - a.parents.length);

                if (selectedParents.map(y => y.parents.length).reduce((a, b) => a + b, 0) === 0) {
                    selectedParents = selectedParents.sort((a, b) => b.id - a.id);
                }

                flatTree = flatTree
                    //remove spouse from list
                    .filter(y =>
                        y.id !== selectedParents[1].id
                    )
                    .map(child => {
                        if (child.parents.length > 0) {
                            //remove spouseID's from children's list
                            child.parents = child.parents.filter(parent => parent !== selectedParents[1].id)
                        }
                        if (child.id === selectedParents[0].id) {
                            //add spouse to partner's list
                            child.spouse = selectedParents[1];
                        }
                        return child;
                    });
            }
        });
        return list_to_tree(flatTree)
    };

    const renderChildren = (node: ExtendedPerson) => {
        const hasSiblingRight = (childIndex: number) => {
            return (node.children1 || []).length > (childIndex + 1)
        };

        const hasSiblingLeft = (childIndex: number) => {
            return childIndex > 0
        };

        const nodeLineBelow = (
            <td colSpan={(node.children1 || []).length * 2} className="nodeGroupCellLines">
                <table className="nodeLineTable">
                    <tbody>
                        <tr>
                            <td colSpan={2} className="nodeLineCell nodeGroupLineVerticalMiddle" />
                            <td colSpan={2} className="nodeLineCell" />
                        </tr>
                    </tbody>
                </table>
            </td>
        );

        const childrenLinesAbove = (node.children1 || []).map((child, childIndex) => (
            <td colSpan={2} className="nodeGroupCellLines" key={childIndex}>
                <table className="nodeLineTable">
                    <tbody>
                        <tr>
                            <td colSpan={2} className={"nodeLineCell nodeGroupLineVerticalMiddle" + (hasSiblingLeft(childIndex) ? ' nodeLineBorderTop' : '')} />
                            <td colSpan={2} className={"nodeLineCell" + (hasSiblingRight(childIndex) ? " nodeLineBorderTop" : "")} />
                        </tr>
                    </tbody>
                </table>
            </td>
        ));

        const children1 = (node.children1 || []).map((child, childIndex) => (
            <td colSpan={2} className="nodeGroupCell" key={childIndex}>
                {renderChildren(child)}
            </td>
        ));

        return (
            <table className="orgNodeChildGroup" key={node.id}>
                <tbody>
                    <tr>
                        <td className="nodeCell" colSpan={(node.children1 || []).length * 2}>
                            <NodeComponent node={node} />
                        </td>
                    </tr>
                    <tr>
                        {(node.children1 || []).length > 0 && nodeLineBelow}
                    </tr>
                    <tr>
                        {childrenLinesAbove}
                    </tr>
                    <tr>
                        {children1}
                    </tr>
                </tbody>
            </table>
        )
    };

    return (
        <div className="reactOrgChart">
            {convertTree(tree).map(x => renderChildren(x))}
        </div>
    )
}