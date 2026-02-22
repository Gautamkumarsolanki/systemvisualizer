import { NodeMetaDataType } from "../Nodes/BackendService";

interface Modal {
	isOpen: boolean;
	onClose: () => void;
	nodeMetaData: NodeMetaDataType;
	setNodeMetaData: React.Dispatch<React.SetStateAction<NodeMetaDataType | null>>;
}

const NodeConfigModal = ({ isOpen, onClose, nodeMetaData, setNodeMetaData }: Modal) => {
	if (!isOpen) return null;
	console.log(nodeMetaData);
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/50" />
			{/* Modal */}
			<div className="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
				<button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
					✕
				</button>
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-lg font-semibold text-black">{nodeMetaData.title}</h2>
				</div>
				<label className="text-black">
					Title
					<input type="text" placeholder="Enter node name" value={nodeMetaData?.title || ''} onChange={(e) => setNodeMetaData({ ...nodeMetaData, title: e.target.value })} className="mb-4 w-full border border-gray-300 p-2 rounded placeholder:text-gray-400" />
				</label>
				<h3 className="text-black"> Connectors </h3>
				<div className="text-black flex gap-2">
					Left: &nbsp; 
					<label> 
						<input type="radio" name="Left" id="1" /> 
					Source 
					</label> 
					<label> 
						<input type="radio" name="Left" id="1" /> Target 
					</label> 
					<label> 
						<input type="radio" name="Left" id="2" checked/> Target 
					</label> 
					<label> 
						<input type="radio" name="Left" id="3" /> None 
					</label>
				</div>
				<div className="text-black flex gap-2">
					Right: &nbsp; 
					<label> 
						<input type="radio" name="Right" id="1" /> Source 
					</label> 
					<label> 
						<input type="radio" name="Right" id="2" /> Target 
					</label> 
					<label> 
						<input type="radio" name="Right" id="3" /> None 
					</label>
				</div>
				<div className="text-black flex gap-2">
					Top: &nbsp; 
					<label> 
						<input type="radio" name="Top" id="1" /> Source 
					</label> 
					<label> 
						<input type="radio" name="Top" id="2" /> Target 
					</label> 
					<label> 
						<input type="radio" name="Top" id="3" /> None 
					</label>
				</div>
				<div className="text-black flex gap-2">
					Bottom: &nbsp; 
					<label> 
						<input type="radio" name="Bottom" id="1" /> Source 
					</label> 
					<label> 
						<input type="radio" name="Bottom" id="2" /> Target 
					</label> 
					<label> 
						<input type="radio" name="Bottom" id="3" /> None 
					</label>
				</div>
				<div className="mt-4">
					<button onClick={onClose} className="w-full rounded-md bg-blue-700 px-2 py-2 text-white hover:bg-blue-600">
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default NodeConfigModal;