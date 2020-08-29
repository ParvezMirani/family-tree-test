import * as React from 'react';
import { OrgChart } from './OrgChart';
import CSS from 'csstype';
import { Person, NodeComponentProp } from '../asset/dataTypes';

const FemaleNode: CSS.Properties = {
    width: '100px',
    margin: '0 auto',
    backgroundColor: '#fac0f3',
    border: '1px black solid'
};

const MaleNode: CSS.Properties = {
    width: '100px',
    margin: '0 auto',
    backgroundColor: '#99ccff',
    border: '1px black solid'
};


export default function RenderTree({ initialTree }: {
    initialTree: Person[];
}) {
    //push customised component to tree
    const MyNodeComponent = ({ node }: NodeComponentProp) => (
        <div key={node.id}>
            <div style={node.gender === "male" ? MaleNode : FemaleNode}>{node.name}</div>
            {node.spouse ? <div style={node.spouse.gender === "male" ? MaleNode : FemaleNode}>{node.spouse.name}</div> : null}
        </div>
    );
    return (
        <div>
            <div>
                <OrgChart tree={initialTree} NodeComponent={MyNodeComponent} />
            </div >
        </div>
    );
}
