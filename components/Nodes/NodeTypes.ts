import ApiGatewayNode from "./ApiGateway";
import BackendServiceNode from "./BackendService";
import CacheNode from "./Cache";
import CDNNode from "./CDN";
import ClientNode from "./ClientNode";
import DatabaseNode from "./Database";
import LoadBalancerNode from "./LoadBalancer";
import MessageQueue from './MessageQueue';
import Proxy from "./Proxy";
import RateLimiter from "./RateLimiter";
import reverseProxy from "./ReverseProxy";
    

const nodeTypes={
    client: ClientNode,
    messagequeue: MessageQueue,
    loadbalancer: LoadBalancerNode,
    database: DatabaseNode,
    cdn: CDNNode,
    cache: CacheNode,
    apigateway: ApiGatewayNode,
    backendservice: BackendServiceNode,
    proxy: Proxy,
    ratelim : RateLimiter,
    reverseProxy: reverseProxy,
}

export default nodeTypes;