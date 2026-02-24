import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LocationSettings } from './LocationSettings';
import { AssetTypeSettings } from './AssetTypeSettings';
import { AssetNumberSettings } from './AssetNumberSettings';
import { WorkspaceSettings } from './WorkspaceSettings';

export function SettingsPanel() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold text-foreground mb-4">Settings</h2>

      <Tabs defaultValue="locations" className="space-y-4">
        <TabsList className="glass-card">
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="asset-types">Asset Types</TabsTrigger>
          <TabsTrigger value="asset-number">Asset Number</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
        </TabsList>

        <TabsContent value="locations">
          <LocationSettings />
        </TabsContent>

        <TabsContent value="asset-types">
          <AssetTypeSettings />
        </TabsContent>

        <TabsContent value="asset-number">
          <AssetNumberSettings />
        </TabsContent>

        <TabsContent value="workspace">
          <WorkspaceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
