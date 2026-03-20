import { ConnectorType } from "@/components/Nodes/ReverseProxy";

export type AINode={
  id: string;
  type: "client" | "messagequeue" | "loadbalancer" | "database" | "cdn" | "apigateway" | "backendservice" | "proxy" | "ratelimiter" | "reverseproxy";
  data: {
    label: string;
    title: string;
    handles: Record<string, ConnectorType>;
  };
  position: {
    x: number;
    y: number;
  };
}

export type AIEdge={
    id: string;
    source: string;
    target: string;
}