import ApiGatewayNode from "./ApiGateway";
import BackendServiceNode from "./BackendService";
import CacheNode from "./Cache";
import CDNNode from "./CDN";
import ClientNode from "./ClientNode";
import DatabaseNode from "./Database";
import LoadBalancerNode from "./LoadBalancer";
import MessageQueue from './MessageQueue';
    

const nodeTypes={
    client: ClientNode,
    messagequeue: MessageQueue,
    loadbalancer: LoadBalancerNode,
    database: DatabaseNode,
    cdn: CDNNode,
    cache: CacheNode,
    apigateway: ApiGatewayNode,
    backendservice: BackendServiceNode,
}

export default nodeTypes;