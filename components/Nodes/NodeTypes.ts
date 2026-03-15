import ApiGatewayNode, { ApiGatewayNodeData } from "./ApiGateway";
import BackendServiceNode, { BackendServiceNodeData } from "./BackendService";
import CacheNode, { CacheNodeData } from "./Cache";
import CDNNode, { CDNNodeData } from "./CDN";
import ClientNode, { ClientNodeData } from "./ClientNode";
import DatabaseNode, { DatabaseNodeData } from "./Database";
import LoadBalancerNode, { LoadBalancerNodeData } from "./LoadBalancer";
import MessageQueue, { MessageQueueNodeData } from './MessageQueue';
import Proxy, { ProxyNodeData } from "./Proxy";
import RateLimiter, { RateLimiterNodeData } from "./RateLimiter";
import reverseProxy, { ReverseProxyNodeData } from "./ReverseProxy";
    

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

export type CustomNodeType = ClientNodeData | MessageQueueNodeData | LoadBalancerNodeData | DatabaseNodeData | CDNNodeData | CacheNodeData | ApiGatewayNodeData | BackendServiceNodeData | ProxyNodeData | RateLimiterNodeData | ReverseProxyNodeData;

export default nodeTypes;