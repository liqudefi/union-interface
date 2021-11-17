import { Control, Card, Button, Box, Heading, Text, Grid } from "union-ui";
import { useRouter } from "next/router";
import useIsSanctioned from "hooks/useIsSanctioned";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useAutoEffect } from "hooks.macro";
import useEagerConnect from "hooks/useEagerConnect";
import useTerms from "hooks/useTerms";
import { CONNECTORS, walletconnect } from "lib/connectors";
import { getWalletIcon } from "util/formatWalletDetails";
import { login } from "lib/auth";
import UnsupportedChainView from "./unsupportedChain";
import { useUpdateForceConnect } from "hooks/useForceConnect";

export default function LoggedOutView() {
  const { data: confirmTerms, setConfirmTerms } = useTerms();
  const router = useRouter();
  const isSanctioned = useIsSanctioned();
  const { activate, error, connector, deactivate } = useWeb3React();
  const [activatingConnector, setActivatingConnector] = useState();

  const unsupportedChainId = error instanceof UnsupportedChainIdError;

  useUpdateForceConnect();

  useAutoEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  });

  /**
   * Handle disconnecting from the wallet if an error occurs
   */
  useAutoEffect(() => {
    if (error) {
      if (connector === walletconnect) connector.close();

      if (!(error instanceof UnsupportedChainIdError)) {
        deactivate();
        setActivatingConnector(undefined);
      }
    }
  });

  const triedEager = useEagerConnect();

  if (unsupportedChainId) {
    return <UnsupportedChainView />;
  }

  return (
    <Box justify="center" align="center" direction="vertical" fluid mb="10vh">
      <Heading mb="4px" mt="64px" size="xlarge" weight="medium" grey={800}>
        Login to Union
      </Heading>
      <Text grey={500} mb="32px">
        Connect to Union with your web3 Ethereum based wallet
      </Text>
      <Grid>
        <Grid.Row justify="center">
          <Grid.Col md={12} lg={9}>
            <Grid.Row>
              <Grid.Col>
                <Card mb="16px" size="fluid" packed>
                  <Card.Body>
                    <Control
                      type="checkbox"
                      checked={confirmTerms}
                      onClick={() => setConfirmTerms(!confirmTerms)}
                      label="I agree to Union’s Terms & Conditions and Privacy Policy"
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              {Object.keys(CONNECTORS).map((name) => {
                const currentConnector = CONNECTORS[name];
                const activating = currentConnector === activatingConnector;
                const connected = currentConnector === connector;
                const disabled = Boolean(
                  !triedEager ||
                    !!activatingConnector ||
                    connected ||
                    !!error ||
                    isSanctioned ||
                    !confirmTerms
                );

                const handleSignIn = async () => {
                  setActivatingConnector(currentConnector);

                  await activate(CONNECTORS[name]);

                  if (name === "MetaMask") {
                    login();
                  }

                  if (router.pathname === "/") router.push("/credit");
                };

                if (
                  typeof window !== "undefined" &&
                  name === "Injected" &&
                  !(window?.ethereum || window?.web3)
                ) {
                  return null;
                }

                return (
                  <Grid.Col xs={12} md={6} key={name}>
                    <Card mb="24px">
                      <Card.Body>
                        <Box justify="center" mb="24px">
                          {getWalletIcon(name)}
                        </Box>
                        <Heading align="center">{name}</Heading>
                        <Button
                          fluid
                          mt="24px"
                          label="Connect"
                          onClick={handleSignIn}
                          disabled={disabled}
                          fontSize="large"
                          loading={activating}
                          variant="secondary"
                        />
                      </Card.Body>
                    </Card>
                  </Grid.Col>
                );
              })}
            </Grid.Row>
          </Grid.Col>
        </Grid.Row>
      </Grid>
    </Box>
  );
}
