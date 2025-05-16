'use client';

import { startTransition, useMemo, useOptimistic, useState } from 'react';
import { saveChatModelAsCookie } from '@/app/(chat)/actions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons/react-icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  chatModels, 
  canAccessModel, 
  type ChatModel, 
  type UserProperties, 
  type ModelFeatures,
  getModelsByCapability 
} from '@/lib/ai/models';

interface ModelSelectorProps {
  selectedModelId: string;
  className?: string;
  user?: UserProperties;
}

const ProviderIcon = ({ provider }: { provider: string }) => {
  switch (provider) {
    case 'OpenAI':
      return <Icons.OpenAI size="4" />;
    case 'Google':
      return <Icons.Google size="4"  />;
    case 'Groq':
      return <Icons.Bolt size="4"  />;
    default:
      return <Icons.OpenAI size="4"  />;
  }
};

const ModelFeatureTooltip = ({ feature }: { feature: ModelFeatures }) => {
  const tooltips: Record<ModelFeatures, string> = {
    chat: 'Basic chat functionality',
    vision: 'Image understanding and generation',
    code: 'Code generation and analysis',
    math: 'Mathematical computations',
    reasoning: 'Advanced logical reasoning',
    streaming: 'Real-time response streaming'
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="secondary" className="h-5 gap-1 px-1.5 text-xs font-normal cursor-help">
          {feature}
        </Badge>
      </TooltipTrigger>
      <TooltipContent>{tooltips[feature]}</TooltipContent>
    </Tooltip>
  );
};

export function ModelSelector({
  selectedModelId,
  className,
  user
}: ModelSelectorProps) {
  // Add debug logging
  console.log('ModelSelector user props:', user);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [optimisticModelId, setOptimisticModelId] = useOptimistic(selectedModelId);

  const selectedChatModel = useMemo(
    () => chatModels.find((chatModel) => chatModel.id === optimisticModelId),
    [optimisticModelId],
  );

  const filteredAndGroupedModels = useMemo(() => {
    const filtered = chatModels.filter(model => 
      model.name.toLowerCase().includes(search.toLowerCase()) ||
      model.description.toLowerCase().includes(search.toLowerCase())
    );

    return getModelsByCapability(filtered);
  }, [search]);

  const getAccessBadge = (model: ChatModel) => {
    if (model.access === 'premium') {
      return (
        <Badge variant="premium" className="h-5 gap-1 px-1.5 text-xs">
          <Icons.Sparkles size="4"  />
          Pro
        </Badge>
      );
    }
    if (model.access === 'beta') {
      return (
        <Badge variant="secondary" className="h-5 gap-1 px-1.5 text-xs">
          <Icons.Beaker size="4"  />
          Beta
        </Badge>
      );
    }
    if (model.access === 'admin') {
      return (
        <Badge variant="destructive" className="h-5 gap-1 px-1.5 text-xs">
          <Icons.Shield size="4"  />
          Admin
        </Badge>
      );
    }
    return null;
  };

  const getModelState = (model: ChatModel) => {
    const canAccess = canAccessModel(model, user);
    const showAdminIndicator = user?.isAdmin && !model.enabled;

    return {
      selectable: canAccess,
      className: cn(
        'grid cursor-pointer gap-1 rounded-lg px-2 py-2 text-sm outline-none',
        'transition-all hover:bg-accent hover:shadow-sm focus:bg-accent',
        model.id === optimisticModelId && 'bg-accent/50',
        !canAccess && 'opacity-50',
        showAdminIndicator && 'border border-dashed border-yellow-500'
      ),
      tooltip: showAdminIndicator ? `Admin: Model is disabled but accessible` : undefined
    };
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'group relative h-9 w-fit justify-between gap-2 rounded-lg bg-background/50 px-3 text-sm font-medium shadow-sm backdrop-blur-sm transition-all hover:bg-accent/50',
            'data-[state=open]:bg-accent/50 data-[state=open]:ring-2 data-[state=open]:ring-ring',
            className
          )}
        >
          <span className="inline-flex items-center gap-2">
            <ProviderIcon provider={selectedChatModel?.provider || 'OpenAI'} />
            <span>{selectedChatModel?.name}</span>
          </span>
          <Icons.ChevronDown className="h-4 w-4 shrink-0 opacity-50 transition-all duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="sticky top-0 z-10 border-b bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="relative">
            <Icons.Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search models..."
              className="h-9 pl-8 pr-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2 px-1.5">
          {(['basic', 'advanced', 'reasoning'] as const).map((capability, i, arr) => {
            const models = filteredAndGroupedModels[capability];
            if (!models.length) return null;
            
            return (
              <div key={capability}>
                <div className="sticky top-0 z-10 mb-2 flex items-center gap-2 bg-background/95 px-2 py-1.5 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <span className="text-sm font-medium capitalize text-foreground">
                    {capability}
                  </span>
                  {capability === 'reasoning' && (
                    <Badge variant="premium" className="h-5 gap-1 px-1.5 text-xs">
                      <Icons.Sparkles className="h-3 w-3" />
                      Advanced Reasoning
                    </Badge>
                  )}
                </div>
                <div className="grid gap-0.5 px-1">
                  {models.map((model) => {
                    const { selectable, className, tooltip } = getModelState(model);
                    const content = (
                      <DropdownMenuItem
                        disabled={!selectable}
                        key={model.id}
                        onSelect={() => {
                          if (!selectable) return;
                          setOpen(false);
                          startTransition(() => {
                            setOptimisticModelId(model.id);
                            saveChatModelAsCookie(model.id);
                          });
                        }}
                        className={className}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <ProviderIcon provider={model.provider} />
                            <span className="font-medium">{model.name}</span>
                            {getAccessBadge(model)}
                          </div>
                          {model.id === optimisticModelId && (
                            <Icons.CheckCircleFill className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div className="line-clamp-2 pl-6 text-xs text-muted-foreground">
                          {model.description}
                        </div>
                        <div className="flex flex-wrap gap-1 pl-6">
                          {model.features.map(feature => (
                            <ModelFeatureTooltip key={feature} feature={feature} />
                          ))}
                        </div>
                      </DropdownMenuItem>
                    );

                    return tooltip ? (
                      <Tooltip key={model.id}>
                        <TooltipTrigger asChild>
                          {content}
                        </TooltipTrigger>
                        <TooltipContent>{tooltip}</TooltipContent>
                      </Tooltip>
                    ) : content;
                  })}
                </div>
                {i < arr.length - 1 && models.length > 0 && (
                  <Separator className="my-2 opacity-50" />
                )}
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
